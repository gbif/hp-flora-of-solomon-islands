---
lang-ref: home
layout: home
title: Flora of Solomon Islands
description: Herbarium specimens of the plants of the Solomon Islands, open through GBIF. Find a specimen, see them on a map, and download the data.
permalink: /

# The page is a stack of blocks (_includes/blocks/siflora*.html). Each block's copy is its inlineData.
# Text in [square brackets] is a placeholder that still needs sourcing.
composition:
  - type: sifloraHero
    inlineData:
      preTitle: Herbarium specimens · Open data through GBIF
      title: Flora of Solomon Islands
      description: Herbarium specimens of the plants of the Solomon Islands, open through GBIF. Find a specimen, see them on a map, and download the data.
      background: /assets/images/home/hero-rainforest-lagoon.jpg
      credit: "[Rainforest above the lagoon and reef: island, photographer and licence to confirm]"
      search:
        action: /occurrence/search
        label: Search the specimens
        placeholder: Search by name, place or collector
        submit: Search
        hint: >-
          Try <a href="/occurrence/search?q=Macaranga"><i>Macaranga</i></a>,
          <a href="/occurrence/search?q=Hymenophyllaceae">Hymenophyllaceae</a> or
          <a href="/occurrence/search?q=Kolombangara">Kolombangara</a>.
      box:
        label: Specimens and dataset summary
        controls:
          show: Show specimen {n} of {total}
          pause: Pause specimen rotation
          play: Play specimen rotation
        # Sheets in the rotation. Images are published on GBIF under CC BY 4.0 (rights holder NMNS).
        # A name longer than the box allows is shown without authorship, or left out (see siflora.js).
        specimens:
          - id: SITW00014-TNM-001
            name: Hibiscus tiliaceus
            authorship: L.
            family: Malvaceae
            image: /assets/images/home/sheet-sitw00014-tnm-001.jpg
            alt: Herbarium sheet of Hibiscus tiliaceus
          - id: SITW04589-TNM-001
            name: Corymborkis veratrifolia
            authorship: (Reinw.) Blume
            family: Orchidaceae
            image: /assets/images/home/sheet-sitw04589-tnm-001.jpg
            alt: Herbarium sheet of Corymborkis veratrifolia
          - id: SITW06003-TNM-001
            name: Macaranga
            authorship: sp.
            family: Euphorbiaceae
            image: /assets/images/home/sheet-sitw06003-tnm-001.jpg
            alt: Herbarium sheet of Macaranga sp.
        # Figures are fetched from the GBIF API when the page loads.
        # The values below are the fallback, true on the asOf date; update them together.
        table:
          number: Table 1.
          caption: Dataset summary
          asOf: ", as of 10 November 2026"
          records:
            label: Records
            text: "{images} images of {species} species"
            images: "13,632"
            species: "1,039"
          collected:
            label: Collected
            text: "{from} to {to}"
            from: "1945"
            to: "2015"
          herbaria:
            label: Herbaria
            value: TNM, TAIF, SUVA  # follows the holder decision

  - type: sifloraGlance
    inlineData:
      title: The collection at a glance
      description: These charts are drawn live from the [published dataset](/dataset/154947b6-0e29-40da-962f-a0d6e3f12a07), so they change when the data does.
      dashboard:
        id: fsi-dashboard
        config:
          charts: [year, taxa, gadmGid]

  - type: sifloraAbout
    inlineData:
      title: About the collection
      # Edited from the old site's introduction; to be confirmed with NMNS.
      text: |
        The Solomon Islands are nearly 1,000 islands in the southwest Pacific. Their tropical climate and mountainous terrain hold more than 7,000 species of vascular plants, and the primary forest is shrinking under logging and plantations.

        Since 2012, the *Census and Classification of Plant Resources in the Solomon Islands* has brought together Solomon Islands, Taiwanese and Japanese partners to document the country's plants. The 2012 and 2013 expeditions alone collected over 15,000 sheets.
      placeholder: "The specimen records were extracted from the previous website, normalised and quality-checked, and mapped to Darwin Core before being published to GBIF. Feedback and suggestions on the data are always welcome."
      image:
        src: /assets/images/home/living-sitw03441-ccwi-001.jpg
        alt: Frond of a Hymenophyllum filmy fern photographed in the field
        caption: >-
          <i>Hymenophyllum</i> sp. on Rendova Island, Western Province, 26 August 2013.
          Photo by Cheng-Wei Chen, <a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a>.

  - type: sifloraField
    inlineData:
      title: From the field
      all:
        text: See all living photos
        href: /occurrence/search?basisOfRecord=HUMAN_OBSERVATION&view=gallery
      photos:
        - name: <i>Vandenboschia maxima</i> (Blume) Copel.
          place: Kolombangara Island, October 2012
          image: /assets/images/home/living-sitw01038-ccwi-001.jpg
          alt: Frond of Vandenboschia maxima
          href: /occurrence/6182177583
        - name: <i>Callistopteris apiifolia</i> (C. Presl) Copel.
          place: Kolombangara Island, October 2012
          image: /assets/images/home/living-sitw00765-ccwi-001.jpg
          alt: Frond of Callistopteris apiifolia
          href: /occurrence/6182181779
        - name: <i>Hymenophyllum</i> sp.
          place: Rendova Island, August 2013
          image: /assets/images/home/living-sitw03441-ccwi-001.jpg
          alt: Frond of a Hymenophyllum species
          href: /occurrence/6182175211
        - name: <i>Hymenophyllum</i> sp.
          place: Kolombangara Island, October 2013
          image: /assets/images/home/living-sitw04935-ccwi-001.jpg
          alt: Mat of a Hymenophyllum species on the forest floor
          href: /occurrence/6182185581
      credit: Photos by Cheng-Wei Chen, <a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a>.

  - type: sifloraPaths
    inlineData:
      title: Ways to explore
      paths:
        - title: Search specimens
          description: Filter by taxon, collector, year or place, then view the results as a table, a gallery or a map.
          href: /occurrence/search
        - title: Read about the dataset
          description: Metadata, licence and citation, and the full Darwin Core Archive to download.
          href: /dataset/154947b6-0e29-40da-962f-a0d6e3f12a07
---
