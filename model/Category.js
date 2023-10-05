const EntitySchema = require('typeorm').EntitySchema;

const CategoryEntity = new EntitySchema({
  name: "Category",
  target: "Category",  //Αν θελω να αναφερομαι σε αυτη την κατηγορια με αυτο τον τροπο μπορω να το ονομασω καπως αλλιωςπχ ctg και να αναφερομαι στον ορο αυτομε την συντομογραφια
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true
    },
    name: {
      type: "varchar"
    }
  }
});

module.exports = { CategoryEntity };