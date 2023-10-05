const { dataSource } = require('../connect');
const PostEntity = require('../model/Post').PostEntity;

function findAll() {
  const result = dataSource
    .getRepository(PostEntity)
    .createQueryBuilder("post") //αυτο το post ειναι το allies
    .leftJoinAndSelect("post.Categories", "category")//Θελουμε να διαβασει το postEntity να φερει αυτο που θελει και στην συνεχια να παει στηο table category και να φερει τα category που αντοιστοιχει στο καθε post
    .getMany()

  return result;
}

function findOne(id) {
  const result = dataSource
    .getRepository(PostEntity)
    .createQueryBuilder('post')
    .leftJoinAndSelect("post.categories", "category")
    .where("post.id = :id", { id: id })
    .getOne()

  return result;
}

function create(data) {
  const result = dataSource
    .getRepository(PostEntity)
    .save(data)
    .catch(error => console.log(error))

  return result
}

function updatePost(data) {
  const result = dataSource
    .getRepository(PostEntity)
    .createQueryBuilder()
    .update(PostEntity)
    .set({
      title: data.title,
      text: data.text
    })
    .where("id = :id", { id: id })
    .execute()
    .catch(error => console.log(error))

  return result;
}

async function updateCategory(data) {
  const actualRealationsShips = await dataSource  //SOS ΓΙΑ ΤΟ AWAIT
    .getRepository(PostEntity)
    .createQueryBuilder()
    .relation(PostEntity, "categories")
    .of(data.id)
    .loadMany()

  // console.log("1>>>",actualRealationsShips); για να δουμε τι δινει
  const result = await dataSource //SOS ΓΙΑ ΤΟ AWAIT
    .getRepository(PostEntity)
    .createQueryBuilder()
    .relation(PostEntity, "categories")
    .of(data.id)
    .addAndRemove(data.categories, actualRealationsShips)
    .catch(error => console.log(error))
  // console.log("2>>>>",result);  για να δουμε τι δινει
  return result;
}


function deletePost(id) {
  const result = dataSource
    .getRepository(PostEntity)
    .createQueryBuilder()
    .delete()
    .from(PostEntity)
    .where("id=id", { id: id })
    .execute()
    .catch(err => console.log(err))

  return result;
}


function deleteCategories(data) {
  const result = dataSource
    .getRepository(PostEntity)
    .createQueryBuilder()
    .relation(PostEntity, "categories")
    .of(data)
    .remove(data.categories)
    .catch(err => console.log(err))

  return result;
}


module.exports = { findAll, findOne, create, updatePost, updateCategory, deletePost, deleteCategories }