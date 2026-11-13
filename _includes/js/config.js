/*
This is the fil in which you configure the data widgets. Feel free to experiment with the configuration options. 
But it is also completely okay to write and issue and ask for help to configure the widgets.
You probably want to check out the documentation at https://hp-theme.gbif-staging.org/documentation-intro
*/

const DATASET_KEYS = [
  "154947b6-0e29-40da-962f-a0d6e3f12a07"
]

// Default "Include authorship" to on in the occurrence table's Scientific name column.
// The widgets have no config option for it: it is a per-browser preference (localStorage key
// "includeAuthorship", default false). Set it only when the visitor has not chosen yet, so their own choice is kept.
try {
  if (window.localStorage.getItem("includeAuthorship") === null) {
    window.localStorage.setItem("includeAuthorship", "true");
  }
} catch (e) { /* storage unavailable: the widget falls back to its own default (off) */ }

var siteConfig = {
  "version": 3,
  "pages": [ // which pages do we want to enable
    {
      "id": "occurrenceSearch"
    },
    {
      "id": "occurrenceKey"
    },
    {
      "id": "collectionSearch"
    },
    {
      "id": "collectionKey"
    },
    {
      "id": "datasetSearch"
    },
    {
      "id": "datasetKey"
    },
    {
      "id": "institutionSearch"
    },
    {
      "id": "institutionKey"
    },
    {
      "id": "literatureSearch"
    }
  ],
  "disableInlineTableFilterButtons": false,
  "availableCatalogues": [
    // The widgets show the "Occurrences / Datasets / ..." selector only when there are 2 or more.
    // One entry hides it on every widget page. Uncomment the types below to show it again.
    "OCCURRENCE",
    // "DATASET",
    // "COLLECTION",
    // "INSTITUTION",
    // "LITERATURE"
  ],
  "dataHeader": {
    "enableApiPopup": false,
    "enableInfoPopup": false
  },
  "theme": { // Lagoon & Sand. Widget pages take only these values
    "primary": themeStyle.colors.primary, // #0A6577, set in _config.yml
    "linkColor": "#0A6577",
    "linkColorHover": "#084F5D",
    "color": "#0B1F24",
    "background": "#EEF1EF",
    "paperBackground": "#FFFFFF",
    "paperBorderColor": "#D3DAD7",
    "borderRadius": 3,
    "fontFamily": "'Geist', 'Noto Sans TC', 'PingFang TC', 'Microsoft JhengHei', system-ui, sans-serif",
    "headerFontFamily": "'Work Sans', 'Noto Sans TC', 'PingFang TC', 'Microsoft JhengHei', system-ui, sans-serif",
    "stickyOffset": "0px"
  },
  "maps": {
    "mapStyles": {
      "defaultProjection": "MERCATOR",
      "defaultMapStyle": "BRIGHT",
      "options": {
        "MERCATOR": [
          "BRIGHT",
          "NATURAL"
        ]
      }
    }
  },
  "languages": [
    {
      "code": "en",
      "localeCode": "en",
      "label": "English",
      "default": true,
      "textDirection": "ltr",
      "iso3LetterCode": "eng",
      "cmsLocale": "en-GB",
      "gbifOrgLocalePrefix": "",
      "mapTileLocale": "en"
    }
  ],
  // Overrides of the widget's built-in wording, per language. Keys and default text:
  // https://react-components.gbif.org/lib/translations/en.json
  "messages": {
    "en": {
      // Result count above the occurrence table: "13,647 records" instead of "results".
      "counts.nResults": "{total, plural, one {# record} other {# records}}",
      // Same wording for the Gallery count ("… with images") and its coordinates variant.
      "counts.nResultsWithImages": "{total, plural, one {# record} other {# records}} with images",
      "counts.nResultsWithCoordinates": "{total, plural, one {# record} other {# records}} with coordinates"
    }
  },
  "occurrenceSearch": {
    "scope": {
      "type": "in",
      "key": "datasetKey",
      "values": DATASET_KEYS,
    },
    "highlightedFilters": [
      "taxonKey",
      "verbatimScientificName",
      "institutionKey",
      // "collectionKey",   // hidden until collection values are extracted; uncomment to show
      // "catalogNumber",   // hidden until catalogue numbers are extracted; uncomment to show
      "recordedBy",
      "identifiedBy"
    ],
    "excludedFilters": [
      "occurrenceStatus",
      "networkKey",
      "hostingOrganizationKey",
      "protocol",
      "publishingCountry",
      "institutionCode",
      "collectionCode",
      // Hide every filter whose field is not mapped in the dataset's Darwin Core occurrence core or multimedia extension.
      // Remove a name from this list to show that filter again once the field is populated.
      // Kept visible: taxonKey, verbatimScientificName, recordedBy, identifiedBy, institutionKey, typeStatus,
      //   occurrenceId, eventId, eventDate, year, month, continent, country, geometry, gadmGid, locality,
      //   basisOfRecord, mediaType, issue, taxonomicIssue, iucnRedListCategory, isInCluster, gbifId, q.
      // Not yet populated (extracted later):
      "collectionKey",
      "catalogNumber",
      // Not mapped: occurrence
      "recordNumber",
      "organismQuantity",
      "organismQuantityType",
      "relativeOrganismQuantity",
      "recordedById",
      "establishmentMeans",
      "lifeStage",
      "sex",
      "pathway",
      "degreeOfEstablishment",
      // Not mapped: event
      "parentEventId",
      "fieldNumber",
      "samplingProtocol",
      "sampleSizeValue",
      "sampleSizeUnit",
      "startDayOfYear",
      "endDayOfYear",
      "eventType",
      // Not mapped: location
      "gbifRegion",
      "coordinateUncertaintyInMeters",
      "distanceFromCentroidInMeters",
      "depth",
      "elevation",
      "higherGeography",
      "waterBody",
      "stateProvince",
      "islandGroup",
      "island",
      "georeferencedBy",
      // Not mapped: identification, taxon, organism, material, geology
      "identifiedById",
      "taxonId",
      "previousIdentifications",
      "organismId",
      "associatedSequences",
      "preparations",
      "geologicalTime",
      "biostratigraphy",
      "lithostratigraphy",
      // Not mapped: sequences
      "nucleotideSequenceId",
      "nucleotideSequenceSequenceLength",
      "nucleotideSequenceNucleotideSequenceID",
      "nucleotideSequenceTargetGene",
      "isSequenced",
      // Dataset-level, one dataset only, or GBIF processing metadata
      "datasetKey",
      "datasetName",
      "datasetId",
      "publishingOrg",
      "publishedByGbifRegion",
      "license",
      "projectId",
      "programme",
      "repatriated",
      "dwcaExtension",
      "lastInterpreted",
      "predicate",
      // Humboldt (ecological inventory) terms: none mapped
      "humboldtBooleans",
      "humboldtEventDurationUnit",
      "humboldtEventDurationValue",
      "humboldtSiteCount",
      "humboldtSamplingEffortValue",
      "humboldtSamplingEffortUnit",
      "humboldtTotalAreaSampledValue",
      "humboldtTotalAreaSampledUnit",
      "humboldtAbundanceCap",
      "humboldtProtocolNames",
      "humboldtInventoryTypes",
      "humboldtSamplingPerformedBy",
      "humboldtTargetDegreeOfEstablishmentScope",
      "humboldtTargetGrowthFormScope",
      "humboldtTargetHabitatScope",
      "humboldtTargetLifeStageScope",
      "humboldtTargetTaxonomicScopeUsageName",
      "humboldtMaterialSampleTypes",
      "humboldtIsAbundanceCapReported",
      "humboldtIsAbundanceReported",
      "humboldtIsTaxonomicScopeFullyReported"
    ],
    "defaultEnabledTableColumns": [
      // scientificName is always the first column. The widget has no kingdom/class/family/genus columns.
      "features",
      // "institutionKey",  // implied by the site context; uncomment to show
      // "collectionKey",   // hidden until collection values are extracted; uncomment to show
      // "catalogNumber",   // hidden until catalogue numbers are extracted; uncomment to show
      // "country",         // implied by the site context; uncomment to show
      // "year",            // covered by eventDate; uncomment to show
      "typeStatus",
      "eventDate",
      "locality",
      "coordinates",
      "recordedBy",
      "identifiedBy",
      "basisOfRecord",
      "occurrenceRemarks"
    ],
    "tabs": [
      "table",
      "gallery",
      "map",
      "clusters",
      // "dashboard",  // hidden; uncomment to show the Dashboard tab again
      "download"
    ],
    "mapSettings": { // Solomon Islands
      "lat": -9,
      "lng": 160,
      "zoom": 6
    }
  },
  "collectionSearch": {
    excludedFilters: ['country', 'active'],
    // highlightedFilters: ['q', 'type', 'publishingOrg', 'license'],
    // defaultTableColumns: ['title', 'description', 'publisher', 'type', 'occurrenceCount', 'literatureCount'],
    scope: {
      // TODO: you should add a scope here if you need search to be limited to a subset
      // search filters have the format {field: [values]}
      active: true
    },
  },
  "institutionSearch": {
    // excludedFilters: ['country', 'active'],
    // highlightedFilters: ['q', 'type'],
    // defaultTableColumns: ['title', 'type'],
    scope: {
      // TODO: you should add a scope here if you need search to be limited to a subset
      // search filters have the format {field: [values]}
      active: true
    }
  },
  "datasetSearch": {
    excludedFilters: ['publishingCountry', 'networkKey', 'projectId', 'hostingOrg'],
    highlightedFilters: ['q', 'type', 'publishingOrg', 'license'],
    scope: {
      // TODO: you should add a scope here if you need search to be limited to a subset
      // search filters have the format {field: [values]}
      type: ['OCCURRENCE', 'CHECKLIST']
    },
  },
  "publisherSearch": {},
  "literatureSearch": {
    "scope": {
      // TODO: you should add a scope here if you need search to be limited to a subset
      // literature search use the predicate format similar to occurrence search
      "type": "in",
      "key": "publishingOrganizationKey",
      "values": [
        "760d5f24-4c04-40da-9646-1b2c935da502",
        "2e7df380-8356-4533-bcb3-5459e23c794e",
        "8e1a97a0-3ca8-11d9-8439-b8a03c50a862"
      ]
    }
  }
}
