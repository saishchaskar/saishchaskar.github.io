window.contributeRegionData = {
  "andaman-and-nicobar-islands": {
    region: "south", crops: [["Coconut", "🥥"], ["Paddy", "🌾"], ["Spices", "🌿"]],
    problem: "How could island growers get useful crop-health guidance when weather, transport, and connectivity differ from mainland assumptions?",
    build: "Prototype an offline-first crop diary that stores observations locally and syncs when a connection returns."
  },
  "andhra-pradesh": {
    region: "south", crops: [["Rice", "🌾"], ["Groundnut", "🥜"], ["Chilli", "🌶️"]],
    problem: "How might crop guidance distinguish a rice, groundnut, or chilli image and ask for the right follow-up before suggesting next steps?",
    build: "Design a crop-aware image intake with clear capture tips, uncertainty states, and source-linked advice."
  },
  "arunachal-pradesh": {
    region: "east", crops: [["Rice", "🌾"], ["Maize", "🌽"], ["Millets", "🌱"]],
    problem: "Can a crop assistant remain useful across varied terrain, local crop varieties, and limited-connectivity settings?",
    build: "Test low-bandwidth screens, local-language labels, and locally reviewed crop-specific content."
  },
  assam: {
    region: "east", crops: [["Rice", "🌾"], ["Tea", "🍃"], ["Jute", "🌿"]],
    problem: "How could a field tool make crop and weather guidance easy to revisit when farm work is interrupted or connectivity is unreliable?",
    build: "Build saved advisories with issue dates, expiry cues, and a clear offline state."
  },
  bihar: {
    region: "east", crops: [["Rice", "🌾"], ["Wheat", "🌾"], ["Maize", "🌽"]],
    problem: "How can the same experience support more than one crop and season without mixing up observations or recommendations?",
    build: "Add a simple crop-and-season context selector that remains attached to image and chat history."
  },
  chandigarh: {
    region: "north", crops: [["Vegetables", "🥬"], ["Wheat", "🌾"], ["Flowers", "🌼"]],
    problem: "How might an urban-edge grower record small-plot crop issues without an interface designed only for large farms?",
    build: "Explore a compact plot diary and image workflow with accessible touch targets."
  },
  chhattisgarh: {
    region: "central", crops: [["Rice", "🌾"], ["Maize", "🌽"], ["Pulses", "🫘"]],
    problem: "Could a crop-health assistant explain what it cannot identify and offer a practical way to save an observation for later review?",
    build: "Create a low-connectivity diagnosis flow with confidence language and a save-for-follow-up path."
  },
  "dadra-and-nagar-haveli-and-daman-and-diu": {
    region: "west", crops: [["Paddy", "🌾"], ["Pulses", "🫘"], ["Horticulture", "🍋"]],
    problem: "How can one interface represent different local crop contexts across a small, coastal union territory without assuming one uniform profile?",
    build: "Make crop context editable and keep region-level assumptions out of individual recommendations."
  },
  delhi: {
    region: "north", crops: [["Vegetables", "🥬"], ["Wheat", "🌾"], ["Flowers", "🌼"]],
    problem: "How might a useful farm tool support small plots and peri-urban growers with quick, readable crop-health guidance?",
    build: "Prototype a mobile-first image capture and follow-up flow that works with screen readers and large text."
  },
  goa: {
    region: "west", crops: [["Rice", "🌾"], ["Coconut", "🥥"], ["Cashew", "🌰"]],
    problem: "Could crop guidance make its sources and uncertainty visible for diverse horticulture and field-crop questions?",
    build: "Add citations, report dates, and a clear hand-off when the app lacks locally reviewed evidence."
  },
  gujarat: {
    region: "west", crops: [["Cotton", "🧵"], ["Groundnut", "🥜"], ["Pearl millet", "🌾"]],
    problem: "How could an image-based tool distinguish look-alike crop symptoms and communicate uncertainty before a grower acts?",
    build: "Build a model-evaluation view grouped by crop, image quality, and lighting conditions."
  },
  haryana: {
    region: "north", crops: [["Wheat", "🌾"], ["Rice", "🌾"], ["Mustard", "🌼"]],
    problem: "How might seasonal advice stay tied to the selected crop and planting context rather than becoming a generic notification?",
    build: "Design advisory cards with crop, season, source, publish date, and an explicit expiry."
  },
  "himachal-pradesh": {
    region: "north", crops: [["Apple", "🍎"], ["Maize", "🌽"], ["Wheat", "🌾"]],
    problem: "Can a crop assistant handle orchard and field-crop observations with different image and follow-up needs?",
    build: "Add an orchard observation flow for plant part, growth stage, and repeat-photo comparison."
  },
  "jammu-and-kashmir": {
    region: "north", crops: [["Apple", "🍎"], ["Rice", "🌾"], ["Saffron", "🌸"]],
    problem: "How should an app adapt crop terminology and guidance across distinct valley and highland growing contexts?",
    build: "Let people set a crop and locality context while keeping recommendations traceable to reviewed sources."
  },
  jharkhand: {
    region: "east", crops: [["Rice", "🌾"], ["Maize", "🌽"], ["Pulses", "🫘"]],
    problem: "How can a farmer save a crop observation and return to it later without a dependable data connection?",
    build: "Implement an offline queue for observations with visible sync status and retry controls."
  },
  karnataka: {
    region: "south", crops: [["Ragi", "🌾"], ["Coffee", "☕"], ["Sugarcane", "🎋"]],
    problem: "How can one product represent food crops and plantation crops without forcing them into the same diagnosis flow?",
    build: "Create crop-specific forms and evaluate image guidance separately for field, orchard, and plantation use."
  },
  kerala: {
    region: "south", crops: [["Coconut", "🥥"], ["Rubber", "🌳"], ["Rice", "🌾"]],
    problem: "Could crop-health content work for tree crops as well as paddy, with observation prompts that fit each plant?",
    build: "Prototype reusable plant-part and growth-stage prompts, then validate them with local experts."
  },
  ladakh: {
    region: "north", crops: [["Barley", "🌾"], ["Wheat", "🌾"], ["Apricot", "🍑"]],
    problem: "How might a short-season crop workflow remain useful offline and avoid assuming plains-based timing?",
    build: "Build a locally configurable crop calendar and test downloadable, date-stamped guidance."
  },
  lakshadweep: {
    region: "south", crops: [["Coconut", "🥥"], ["Tuber crops", "🥔"], ["Vegetables", "🥬"]],
    problem: "How can a crop support experience remain lightweight and resilient for island conditions and limited connectivity?",
    build: "Prioritize small downloads, offline access, and clear sync behavior for saved crop observations."
  },
  "madhya-pradesh": {
    region: "central", crops: [["Soybean", "🫘"], ["Wheat", "🌾"], ["Pulses", "🫘"]],
    problem: "Can an assistant keep disease predictions and treatment references specific to crop and growth stage?",
    build: "Add crop-stage context to the diagnostic record and compare model results across those groups."
  },
  maharashtra: {
    region: "west", crops: [["Cotton", "🧵"], ["Soybean", "🫘"], ["Sugarcane", "🎋"]],
    problem: "How might a multilingual assistant show the evidence behind a crop-health answer and make uncertain results easy to question?",
    build: "Add answer citations, confidence explanations, and a feedback path for incorrect or unclear guidance."
  },
  manipur: {
    region: "east", crops: [["Rice", "🌾"], ["Maize", "🌽"], ["Pulses", "🫘"]],
    problem: "Can a crop assistant support local language and crop terminology without making translation quality invisible?",
    build: "Create a translation review workflow with source text, reviewer notes, and fallback language."
  },
  meghalaya: {
    region: "east", crops: [["Rice", "🌾"], ["Maize", "🌽"], ["Potato", "🥔"]],
    problem: "How can a field tool make image capture and diagnosis understandable across varied crops and device conditions?",
    build: "Test crop-specific capture guidance and save-and-resume behavior on lower-end phones."
  },
  mizoram: {
    region: "east", crops: [["Rice", "🌾"], ["Maize", "🌽"], ["Ginger", "🫚"]],
    problem: "Could offline-first crop guidance reduce the friction of recording an issue when a farmer cannot stay connected?",
    build: "Build a compact offline observation form and make the later sync outcome explicit."
  },
  nagaland: {
    region: "east", crops: [["Rice", "🌾"], ["Maize", "🌽"], ["Millets", "🌱"]],
    problem: "How might crop advice account for locally named crops and varieties rather than relying only on broad labels?",
    build: "Add a reviewed crop glossary that supports local names alongside stable crop identifiers."
  },
  odisha: {
    region: "east", crops: [["Rice", "🌾"], ["Pulses", "🫘"], ["Millets", "🌱"]],
    problem: "How could an app help someone keep a crop-health record and revisit it after a weather or connectivity interruption?",
    build: "Add a timeline of image observations with timestamps, crop context, and offline-safe drafts."
  },
  puducherry: {
    region: "south", crops: [["Rice", "🌾"], ["Groundnut", "🥜"], ["Sugarcane", "🎋"]],
    problem: "How can crop recommendations stay transparent about source and locality when users move between distinct farming contexts?",
    build: "Show selected crop and locality on every saved advisory and allow people to correct either."
  },
  punjab: {
    region: "north", crops: [["Wheat", "🌾"], ["Rice", "🌾"], ["Cotton", "🧵"]],
    problem: "Could a farmer-facing app organize crop, season, and field observations so advice is easier to compare over time?",
    build: "Prototype a season-aware field log that links each image and recommendation to its source."
  },
  rajasthan: {
    region: "west", crops: [["Pearl millet", "🌾"], ["Mustard", "🌼"], ["Pulses", "🫘"]],
    problem: "How might a low-data tool make crop guidance usable when field observations need to be saved before a stable connection is available?",
    build: "Optimize image upload sizes and queue uploads with understandable progress and retry states."
  },
  sikkim: {
    region: "east", crops: [["Large cardamom", "🌿"], ["Maize", "🌽"], ["Rice", "🌾"]],
    problem: "Can a crop-health workflow distinguish plantation observations from field crops and retain clear source attribution?",
    build: "Add configurable crop profiles and validate diagnosis prompts with crop-specific reviewers."
  },
  "tamil-nadu": {
    region: "south", crops: [["Rice", "🌾"], ["Millets", "🌱"], ["Sugarcane", "🎋"]],
    problem: "How can an app offer useful crop guidance in a farmer’s preferred language while preserving technical meaning?",
    build: "Create a terminology review and accessibility checklist for multilingual crop-health screens."
  },
  telangana: {
    region: "south", crops: [["Cotton", "🧵"], ["Rice", "🌾"], ["Maize", "🌽"]],
    problem: "How might an image model communicate the limits of a crop prediction before a person relies on it?",
    build: "Show calibrated confidence, request a retake when image quality is weak, and log user corrections."
  },
  tripura: {
    region: "east", crops: [["Rice", "🌾"], ["Rubber", "🌳"], ["Pineapple", "🍍"]],
    problem: "Can one tool support both field crops and horticulture with useful, crop-aware follow-up questions?",
    build: "Build flexible crop-specific observation forms and verify their terminology with local reviewers."
  },
  "uttar-pradesh": {
    region: "north", crops: [["Wheat", "🌾"], ["Rice", "🌾"], ["Sugarcane", "🎋"]],
    problem: "How could recommendations remain understandable across multiple crops and local calendars within a large state?",
    build: "Make crop, season, and locality explicit inputs and keep each recommendation linked to its source."
  },
  uttarakhand: {
    region: "north", crops: [["Rice", "🌾"], ["Wheat", "🌾"], ["Millets", "🌱"]],
    problem: "How might a phone-based crop assistant work across different terrain and connectivity conditions without losing saved work?",
    build: "Test offline drafts, accessible controls, and low-bandwidth behavior on a range of devices."
  },
  "west-bengal": {
    region: "east", crops: [["Rice", "🌾"], ["Potato", "🥔"], ["Jute", "🌿"]],
    problem: "Could an assistant make crop-health guidance easy to verify and return to across different crop workflows?",
    build: "Add source cards with publisher, date, crop relevance, and a clear path to report outdated guidance."
  }
};
