(() => {
  const cards = [...document.querySelectorAll('.challenge-card[data-region]')];
  const controls = [...document.querySelectorAll('[data-region-select]')];
  const emptyState = document.querySelector('.filter-empty');
  const menu = document.querySelector('#mobile-menu');
  const menuButton = document.querySelector('#mobile-menu-btn');

  if (menu && menuButton) {
    menuButton.addEventListener('click', () => {
      const isOpen = menu.classList.contains('max-h-0');
      menu.classList.toggle('max-h-0', !isOpen);
      menu.classList.toggle('opacity-0', !isOpen);
      menu.classList.toggle('max-h-screen', isOpen);
      menu.classList.toggle('opacity-100', isOpen);
      menuButton.innerHTML = `<ion-icon name="${isOpen ? 'close-outline' : 'menu-outline'}" aria-hidden="true"></ion-icon>`;
    });
  }

  const mapRoot = document.querySelector('#india-map-root');
  const mapStatus = document.querySelector('#map-status-text');
  const insightTitle = document.querySelector('#insight-title');
  const insightCrops = document.querySelector('#insight-crops');
  const insightProblem = document.querySelector('#insight-problem');
  const insightBuild = document.querySelector('#insight-build');
  const insightCropFact = document.querySelector('#insight-crop-fact');
  const insightWaterFact = document.querySelector('#insight-water-fact');
  const insightWeatherFact = document.querySelector('#insight-weather-fact');
  const regionData = window.contributeRegionData;
  const cropSowingNotes = {
    assam: 'Rabi jowar sowing had commenced.',
    'jammu-and-kashmir': 'Rabi jowar sowing had commenced.',
    karnataka: 'Rabi maize sowing had commenced.',
    kerala: 'Rabi rice sowing had commenced.',
    mizoram: 'Rabi lentil, urdbean, and other-pulse sowing had commenced.',
    nagaland: 'Rabi gram, lentil, fieldpea, urdbean, other-pulse, and linseed sowing had commenced.',
    rajasthan: 'Rabi gram, jowar, barley, and other-pulse sowing had commenced.',
    sikkim: 'Rabi fieldpea sowing had commenced.',
    'tamil-nadu': 'Rabi rice, rapeseed-and-mustard, and groundnut sowing had commenced.'
  };
  const reservoirRegionByState = {
    assam: 'east',
    bihar: 'east',
    chhattisgarh: 'central',
    goa: 'west',
    gujarat: 'west',
    'himachal-pradesh': 'north',
    jharkhand: 'east',
    karnataka: 'south',
    kerala: 'south',
    'madhya-pradesh': 'central',
    maharashtra: 'west',
    meghalaya: 'east',
    mizoram: 'east',
    nagaland: 'east',
    odisha: 'east',
    punjab: 'north',
    rajasthan: 'north',
    'tamil-nadu': 'south',
    telangana: 'south',
    tripura: 'east',
    'uttar-pradesh': 'central',
    uttarakhand: 'central',
    'west-bengal': 'east',
    'andhra-pradesh': 'south'
  };
  const reservoirRegionFacts = {
    north: { name: 'North', reservoirs: 11, current: '57.33%', normal: '79.31%' },
    east: { name: 'East', reservoirs: 31, current: '79.89%', normal: '80.84%' },
    west: { name: 'West', reservoirs: 58, current: '80.73%', normal: '86.91%' },
    central: { name: 'Central', reservoirs: 28, current: '86.36%', normal: '85.15%' },
    south: { name: 'South', reservoirs: 50, current: '44.31%', normal: '77.54%' }
  };
  const observedWeatherNotes = {
    'madhya-pradesh': 'The IMD bulletin issued 19 Oct reported 12 cm at Guna in the 24 hours ending 05:30 IST that morning, with isolated heavy-to-very-heavy rain in West Madhya Pradesh. This is a past observation, not a current forecast.'
  };

  function setMapStatus(message) {
    if (mapStatus) mapStatus.textContent = message;
  }

  function showInsight(name, type, data, slug) {
    if (!insightTitle || !insightCrops || !insightProblem || !insightBuild || !insightCropFact || !insightWaterFact || !insightWeatherFact) return;

    insightTitle.textContent = `${name} · ${type}`;
    insightCrops.replaceChildren();
    data.crops.forEach(([crop, icon]) => {
      const item = document.createElement('li');
      item.textContent = `${icon} ${crop}`;
      insightCrops.append(item);
    });
    insightProblem.textContent = data.problem;
    insightBuild.textContent = `Build prompt: ${data.build}`;
    insightCropFact.textContent = cropSowingNotes[slug] ||
      'The cited crop bulletin does not list a state-specific sowing note here; no state-level inference is made.';
    const reservoirRegion = reservoirRegionFacts[reservoirRegionByState[slug]];
    insightWaterFact.textContent = reservoirRegion
      ? `${reservoirRegion.name} region: ${reservoirRegion.current} of capacity across ${reservoirRegion.reservoirs} monitored reservoirs; normal for this date was ${reservoirRegion.normal}. This is a regional sample, not a state or farm water-supply estimate.`
      : 'The cited CWC bulletin does not assign this state/UT to a monitoring region; no regional storage figure is inferred.';
    insightWeatherFact.textContent = observedWeatherNotes[slug] ||
      'No state- or district-specific rainfall observation from this bulletin is attached to this map selection.';
  }

  async function loadIndiaMap() {
    if (!mapRoot) return;
    if (!regionData) {
      setMapStatus('State context unavailable');
      mapRoot.textContent = 'State crop and problem context could not be loaded.';
      console.error('The India map context data is missing.');
      return;
    }

    try {
      const response = await fetch('../assets/maps/india-states.svg');
      if (!response.ok) throw new Error(`Map request failed with HTTP ${response.status}`);

      const source = await response.text();
      const parsed = new DOMParser().parseFromString(source, 'image/svg+xml');
      if (parsed.querySelector('parsererror') || parsed.querySelector('script, foreignObject')) {
        throw new Error('The map asset could not be safely parsed.');
      }

      const svg = document.importNode(parsed.documentElement, true);
      const originalViewBox = svg.viewBox.baseVal;
      const baseViewBox = {
        x: originalViewBox.x,
        y: originalViewBox.y,
        width: originalViewBox.width,
        height: originalViewBox.height
      };
      if (!baseViewBox.width || !baseViewBox.height) throw new Error('The map asset has no usable viewBox.');

      svg.id = 'india-map-svg';
      svg.setAttribute('role', 'group');
      svg.setAttribute('aria-label', 'Interactive map of India with 28 states and 8 union territories');
      svg.removeAttribute('aria-labelledby');
      svg.querySelectorAll('title, desc').forEach((node) => node.remove());
      mapRoot.replaceChildren(svg);

      const features = [...svg.querySelectorAll('.map-region[data-slug][data-state]')];
      const missingData = features.filter((feature) => !regionData[feature.dataset.slug]);
      if (features.length !== 36 || missingData.length) {
        throw new Error(`Map context mismatch: found ${features.length} regions and ${missingData.length} missing entries.`);
      }

      const markerLayer = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      markerLayer.setAttribute('class', 'crop-marker-layer');
      markerLayer.setAttribute('aria-hidden', 'true');
      features.forEach((feature) => {
        const data = regionData[feature.dataset.slug];
        const bounds = feature.getBBox();
        const x = bounds.x + bounds.width / 2;
        const y = bounds.y + bounds.height / 2;
        const marker = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        marker.setAttribute('class', 'crop-marker');
        marker.setAttribute('transform', `translate(${x} ${y})`);

        const background = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        background.setAttribute('r', '20');
        const icon = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        icon.textContent = data.crops[0][1];
        marker.append(background, icon);
        markerLayer.append(marker);
      });
      svg.append(markerLayer);

      let selectedSlug = '';
      let activeSlug = '';
      function updateActive(slug) {
        activeSlug = slug;
        features.forEach((feature) => {
          feature.classList.toggle('is-active', feature.dataset.slug === slug);
        });
      }

      function previewFeature(feature) {
        const slug = feature.dataset.slug;
        const data = regionData[slug];
        updateActive(slug);
        showInsight(feature.dataset.state, feature.dataset.type, data, slug);
        setMapStatus(`${feature.dataset.state} · crop examples, official snapshots and tech prompt`);
      }

      function selectFeature(feature) {
        selectedSlug = feature.dataset.slug;
        features.forEach((item) => {
          const selected = item.dataset.slug === selectedSlug;
          item.classList.toggle('is-selected', selected);
          item.setAttribute('aria-pressed', String(selected));
        });
        previewFeature(feature);
        setMapStatus(`Selected ${feature.dataset.state}`);
      }

      function restoreInsight() {
        if (activeSlug) {
          const activeFeature = features.find((feature) => feature.dataset.slug === activeSlug);
          if (activeFeature) return previewFeature(activeFeature);
        }
        if (selectedSlug) {
          const selectedFeature = features.find((feature) => feature.dataset.slug === selectedSlug);
          if (selectedFeature) return previewFeature(selectedFeature);
        }
        if (insightTitle && insightCrops && insightProblem && insightBuild && insightCropFact && insightWaterFact && insightWeatherFact) {
          insightTitle.textContent = 'Choose a state on the map';
          insightCrops.replaceChildren();
          insightProblem.textContent = 'Hover, focus, or select a state to see a locally framed technology question.';
          insightBuild.textContent = '';
          insightCropFact.textContent = 'Choose a state to see whether the Ministry bulletin includes a state-specific note.';
          insightWaterFact.textContent = 'Choose a state to see its CWC monitoring-region comparison, where reported.';
          insightWeatherFact.textContent = 'Choose a state to see whether a dated observation from this bulletin is relevant.';
        }
        setMapStatus('36 states & union territories · hover or focus a state');
      }

      features.forEach((feature) => {
        const data = regionData[feature.dataset.slug];
        const cropNames = data.crops.map(([crop]) => crop).join(', ');
        feature.setAttribute('role', 'button');
        feature.setAttribute('aria-label', `${feature.dataset.state}, ${feature.dataset.type}. Crop examples: ${cropNames}. Activate for its technology prompt.`);
        feature.setAttribute('aria-pressed', 'false');
        feature.classList.add('map-region-button');

        const title = document.createElementNS('http://www.w3.org/2000/svg', 'title');
        title.textContent = `${feature.dataset.state}: ${cropNames}`;
        feature.prepend(title);
        feature.addEventListener('pointerenter', () => previewFeature(feature));
        feature.addEventListener('pointerleave', () => {
          activeSlug = '';
          updateActive('');
          restoreInsight();
        });
        feature.addEventListener('focus', () => previewFeature(feature));
        feature.addEventListener('blur', () => {
          activeSlug = '';
          updateActive('');
          restoreInsight();
        });
        feature.addEventListener('click', () => selectFeature(feature));
        feature.addEventListener('keydown', (event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            selectFeature(feature);
          }
        });
      });

      const zoomIn = document.querySelector('#map-zoom-in');
      const zoomOut = document.querySelector('#map-zoom-out');
      const zoomReset = document.querySelector('#map-zoom-reset');
      let zoom = 1;
      function setZoom(nextZoom) {
        zoom = Math.min(3.5, Math.max(1, nextZoom));
        const width = baseViewBox.width / zoom;
        const height = baseViewBox.height / zoom;
        const x = baseViewBox.x + (baseViewBox.width - width) / 2;
        const y = baseViewBox.y + (baseViewBox.height - height) / 2;
        svg.setAttribute('viewBox', `${x} ${y} ${width} ${height}`);
        if (zoomIn) zoomIn.disabled = zoom >= 3.5;
        if (zoomOut) zoomOut.disabled = zoom <= 1;
        if (zoomReset) zoomReset.disabled = false;
      }
      zoomIn?.addEventListener('click', () => setZoom(zoom * 1.25));
      zoomOut?.addEventListener('click', () => setZoom(zoom / 1.25));
      zoomReset?.addEventListener('click', () => setZoom(1));
      setZoom(1);
      setMapStatus('36 states & union territories · hover or focus a state');
    } catch (error) {
      setMapStatus('State map unavailable');
      mapRoot.textContent = 'The state map could not be loaded. Please refresh to try again.';
      console.error('Unable to load the India state map.', error);
    }
  }

  loadIndiaMap();

  function selectRegion(region) {
    const matchingCards = cards.filter((card) => {
      return region === 'all' || card.dataset.region.split(/\s+/).includes(region);
    });

    cards.forEach((card) => {
      card.hidden = !matchingCards.includes(card);
    });
    controls.forEach((control) => {
      const isSelected = control.dataset.regionSelect === region;
      control.setAttribute('aria-pressed', String(isSelected));
    });
    if (emptyState) emptyState.hidden = matchingCards.length > 0;

    const results = document.querySelector('.challenge-grid');
    if (results) {
      results.setAttribute(
        'aria-label',
        region === 'all' ? 'All regional problem statements' : `${region} regional problem statements`
      );
    }
  }

  controls.forEach((control) => {
    control.addEventListener('click', () => selectRegion(control.dataset.regionSelect || 'all'));
  });

  const sources = [
    {
      organization: 'Government of India · Agriculture & Farmers Welfare',
      title: 'Agriculture statistics and scheme information',
      summary: 'Start with the ministry’s official information and statistics pages when checking crop and scheme context. This portfolio does not import or display live government data.',
      href: 'https://agriwelfare.gov.in/en/AgriculturalStatistics',
      note: 'Official Indian agriculture portal'
    },
    {
      organization: 'Government of India · PMFBY',
      title: 'Pradhan Mantri Fasal Bima Yojana',
      summary: 'Review the official crop-insurance scheme information before designing insurance-related explanations or farmer support flows.',
      href: 'https://pmfby.gov.in/',
      note: 'Farmer scheme · crop insurance'
    },
    {
      organization: 'Government of India · Soil Health Card',
      title: 'Soil testing and soil-health information',
      summary: 'Use the official portal as a reference when exploring soil-related information needs. The map does not infer soil conditions for any state.',
      href: 'https://soilhealth.dac.gov.in/',
      note: 'Farmer information service'
    },
    {
      organization: 'India Meteorological Department',
      title: 'Weather forecasts and services',
      summary: 'Use the official IMD portal for weather information. No live forecast, alert, or agrometeorological advisory is embedded in this portfolio.',
      href: 'https://mausam.imd.gov.in/',
      note: 'Official Indian weather source'
    },
    {
      organization: 'Government of India · Agmarknet',
      title: 'Agricultural market information',
      summary: 'Check the official market-information portal for commodity and market context. Prices and arrivals are not collected or shown on this page.',
      href: 'https://agmarknet.gov.in/',
      note: 'Market information'
    },
    {
      organization: 'Government of India · e-NAM',
      title: 'National Agriculture Market',
      summary: 'Explore the official electronic market portal when researching market access and trading information. This page does not access e-NAM data.',
      href: 'https://enam.gov.in/web/',
      note: 'Market information'
    }
  ];

  const sourceList = document.querySelector('#source-list');
  if (sourceList) {
    sources.forEach((source) => {
      const article = document.createElement('article');
      article.className = 'source-card';

      const organization = document.createElement('span');
      organization.className = 'source-org';
      organization.textContent = source.organization;

      const heading = document.createElement('h3');
      heading.textContent = source.title;

      const summary = document.createElement('p');
      summary.textContent = source.summary;

      const note = document.createElement('small');
      note.textContent = source.note;

      const link = document.createElement('a');
      link.href = source.href;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.textContent = 'Open source ';

      const icon = document.createElement('ion-icon');
      icon.name = 'open-outline';
      icon.setAttribute('aria-hidden', 'true');
      link.append(icon);

      article.append(organization, heading, summary, note, link);
      sourceList.append(article);
    });
  }

  selectRegion('all');
})();
