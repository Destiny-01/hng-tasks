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
        let attributes = el.field7.split(/:|\.\s|;/);
        // Omo, if your attribute column is incorrect, sorry
        if (attributes.length < 16) {
          return;
        }
        const data = {
          ...rawData,
          name: el.field4,
          description: el.field5,
          minting_tool: teams[parseInt(el.field2 / 20)],
          series_number: el.field2,
          series_total: arr.length,
          attributes: [
            { trait_type: "Gender", value: el.field6 },
            { trait_type: attributes[0], value: attributes[1].trim() },
            { trait_type: attributes[2].trim(), value: attributes[3].trim() },
            { trait_type: attributes[4].trim(), value: attributes[5].trim() },
            { trait_type: attributes[6].trim(), value: attributes[7].trim() },
            { trait_type: attributes[8].trim(), value: attributes[9].trim() },
            { trait_type: attributes[10].trim(), value: attributes[11].trim() },
            { trait_type: attributes[12].trim(), value: attributes[13].trim() },
            { trait_type: attributes[14].trim(), value: attributes[15].trim() },
          ],
          collection: {
            ...rawData.collection,
            id: el.field8,
          },
        };
        let hash = createHash("sha256")
          .update(JSON.stringify(data))
          .digest("hex");
        el.field2 &&
          fs.writeFile(
            `files/${el.field3}.output.csv`,
            JSON.stringify({ ...data, hash }, null, 4),
            (err) => {
              console.log(err);
            }
          );
      });
    });
  });
};
