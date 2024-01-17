import './AddTask.css';

export default function AddTask({addTaskInput, checkbox}) {

    return (
      <section className={addTaskInput}>
        <input className='add-task-input-checkbox' type='checkbox' />
        <span className={checkbox}></span>
        <input className='add-task-input-text' type="text" placeholder='Create a new todo...' />
      </section>
    );
  }