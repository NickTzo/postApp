const CategoryEntity = require('../model/Category').CategoryEntity;
const dataSource = require('../connect').dataSource;

function findAll() {
  const result = dataSource
    .getRepository(CategoryEntity)
    .createQueryBuilder()
    .select('category')
    .from(CategoryEntity, 'category')  //Μπορουν και να μην μπουν αν δεν θελουμε
    .getMany()

  return result;
}


function findOne(id) {
  const result = dataSource
    .getRepository(CategoryEntity)
    .createQueryBuilder()
    .select('ct')//select * from Category as ct <-- αυτο το ct ειναι μεσα στις αγκιλες
    .from(CategoryEntity, ct)
    .where('ct.id = :x', { x: id })
    .getOne

  return result;
}


function create(name) {
  console.log("Service category create", name)

  const result = dataSource
    .getRepository(CategoryEntity)
    .createQueryBuilder()
    .insert()
    .into(CategoryEntity)
    .values([
      { name: name }
    ])
    .execute()
    .catch(error => console.log(error));

  return result;
}

function update(data) {
  console.log("Service category update")

  const result = dataSource
    .getRepository(CategoryEntity)
    .createQueryBuilder()
    .update(CategoryEntity)
    .set({ name: data.name })
    .where("id = :id", { id: data.id })
    .execute()
    .catch(error => console.log(error))

  return result;
}

function deleteCategory(id) {
  console.log("Service category delete")

  const result = dataSource
    .getRepository(CategoryEntity)
    .createQueryBuilder()
    .delete()
    .from(CategoryEntity)
    .where("id = :x", { x: id })
    // .getQuery();  //Αν θελουμε να δουμε ποιο query κανει πραγματικα να το ενφανισει
    .execute()
    .catch(error => console.log(error))

  return result;
}

module.exports = { create, findAll, findOne, update, deleteCategory };