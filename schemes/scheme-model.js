const db = require('../data/db-config');

//find 
function find() {
    return db('schemes');
};

//find by id
function findById(id) {
    return db ('schemes').where({id}).first();
};

//find scheme steps
function findSteps(scheme_id){
    return db('steps as st' )
    .join('schemes as sc', 'sc.id', 'st.scheme_id')
    .select('st.step_number', 'st.instructions')
    .where({scheme_id});
};

//add scheme
function add(scheme) {
    return db('schemes')
      .insert(scheme)
      .then((ids) => {
        return findById(ids[0]);
      });
  }

//add step
  function addStep(step) {
    return db('steps')
      .insert(step)
      .then((ids) => {
        return getStepId(ids[0]);
      });
    }

 //update
 function update(changes, id) {
    return db('schemes')
      .where({ id })
      .update(changes)
      .then(() => findById(id));
  }

//delete
function remove(id){
    return db('schemes')
    .where({id}).del();
};

module.exports = {
    find,
    findById,
    findSteps,
    add,
    addStep,
    update,
    remove,
  };
