export const getAllTodos = 'select * from todos';
export const addTodo = 'insert into todos (title,description,completed) values($1,$2,$3) returning *';
export const updateTodo = "UPDATE todos SET title = $1,description = $2,completed = $3 WHERE id = $4 RETURNING *";
export const deleteTodo = 'delete from todos where id =$1';