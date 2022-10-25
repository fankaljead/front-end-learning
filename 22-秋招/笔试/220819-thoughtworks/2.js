function findComplement(
  PhoneAFeatures = [
    "long lasting battery",
    "clear display",
    "great camera",
    "storage space",
  ],
  PhoneBFeatures = [
    "clear display",
    "long lasting battery",
    "great camera",
    "warp-speed word processing",
  ]
) {
  return PhoneBFeatures.filter((feature) => !PhoneAFeatures.includes(feature.toLowerCase()));
}

console.log(
  findComplement(
    ["long battery", "great display"],
    [
      "tincidunt",
      "tortor",
      "aliquam",
      "nulla",
      "facilisi",
      "cras",
      "fermentum",
      "odio",
      "eu",
      "feugiat",
      "pretium",
      "nibh",
      "ipsum",
      "consequat",
      "nisl",
      "vel",
      "lectus",
      "quam",
      "id",
      "leo",
      "in",
      "vitae",
      "turpis",
      "massa",
      "sed",
      "elementum",
      "tempus",
      "egestas",
      "risus",
      "vulputate",
      "dignissim",
      "suspendisse",
      "est",
      "ante",
      "mauris",
      "cursus",
      "mattis",
      "molestie",
      "a",
      "iaculis",
      "at",
      "erat",
      "pellentesque",
      "adipiscing",
      "commodo",
      "elit",
      "imperdiet",
      "dui",
      "accumsan",
      "sit",
      "amet",
      "morbi",
      "urna",
      "volutpat",
      "lacus",
      "laoreet",
      "non",
      "curabitur",
      "gravida",
      "arcu",
      "ac",
      "convallis",
      "aenean",
      "et",
      "viverra",
      "tellus",
      "integer",
      "scelerisque",
      "varius",
      "enim",
      "nunc",
      "faucibus",
    ]
  )
);
