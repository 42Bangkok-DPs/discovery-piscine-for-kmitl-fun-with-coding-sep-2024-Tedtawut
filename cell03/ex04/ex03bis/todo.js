$(document).ready(function() {

    function addTodo(text) {
        const $todoDiv = $('<div class="todo"></div>').text(text);


        $todoDiv.click(function() {
            if (confirm('Do you want to remove this TO DO?')) {
                $(this).remove();
                saveTodos();
            }
        });


        $('#ft_list').prepend($todoDiv);
        saveTodos(); 
    }


    function saveTodos() {
        const todos = [];
        $('.todo').each(function() {
            todos.push($(this).text());
        });
        document.cookie = `todos=${JSON.stringify(todos)};path=/;expires=Fri, 31 Dec 9999 23:59:59 GMT`;
    }


    function loadTodos() {
        const cookies = document.cookie.split(';');
        let todosCookie = cookies.find(cookie => cookie.trim().startsWith('todos='));
        if (todosCookie) {
            todosCookie = todosCookie.split('=')[1];
            const todos = JSON.parse(todosCookie);
            todos.forEach(todo => {
                addTodo(todo);
            });
        }
    }

 
    $('#newButton').click(function() {
        const todoText = prompt('Enter a new TO DO:');
        if (todoText && todoText.trim() !== '') {
            addTodo(todoText); 
        } else {
            alert('The TO DO cannot be empty.');
        }
    });


    loadTodos();
});