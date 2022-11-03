const fs = require("fs");
const { createHash } = require("crypto");

const rawData = {
  format: "CHIP-0007",
  name: "Pikachu",
  description: "Electric-type Pokémon with stretchy cheeks",
  minting_tool: "SuperMinter/2.5.2",
  sensitive_content: false,
  series_number: 22,
  series_total: 1000,
  attributes: [
    {
      trait_type: "Species",
      value: "Mouse",
    },
    {
      trait_type: "Color",
      value: "Yellow",
    },
    {
      trait_type: "Friendship",
      value: 50,
      min_value: 0,
      max_value: 255,
    },
  ],
  collection: {
    name: "Zuri NFT Tickets for Free Lunch",
    id: "b774f676-c1d5-422e-beed-00ef5510c64d",
    attributes: [
      {
        type: "description",
        value: "Rewards for accomplishments during HNGi9.",
      },
    ],
  },
};

exports.formatData = (arr, teams) => {
  // clean up the files directory
  fs.rmdir("files", { recursive: true, force: true }, (er) => {
    fs.mkdir("files", (err) => {
      arr.forEach((el) => {
        // get the data and insert it in the right place!
        let attributes = el.field6.split(/:|\.\s|,/);
        const data = {
          ...rawData,
          name: el.field3,
          description: el.field4,
          minting_tool: teams[parseInt(el.field1 / 20)],
          series_number: el.field1,
          series_total: arr.length,
          attributes: [
            { trait_type: "Gender", value: el.field5 },
            { trait_type: "Hair", value: attributes[1] },
            { trait_type: "Eyes", value: attributes[3] },
            { trait_type: "Teeth", value: attributes[5] },
            { trait_type: "Clothing", value: attributes[7] },
            { trait_type: "Accessories", value: attributes[9] },
            { trait_type: "Expression", value: attributes[11] },
            { trait_type: "Strength", value: attributes[13] },
            { trait_type: "Weakness", value: attributes[15] },
          ],
          collection: {
            ...rawData.collection,
            id: el.field7,
          },
        };
        let hash = createHash("sha256")
          .update(JSON.stringify(data))
          .digest("hex");
        el.field2 &&
          fs.writeFile(
            `files/${el.field2}.output.csv`,
            JSON.stringify({ ...data, hash }, null, 4),
            (err) => {
              console.log(err);
            }
          );
      });
    });
  });
};
