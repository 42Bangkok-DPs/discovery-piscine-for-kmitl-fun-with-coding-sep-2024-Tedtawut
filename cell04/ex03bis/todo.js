$(document).ready(function() {
    // Function to add a new TO DO item
    function addTodo(text) {
        const $todoDiv = $('<div class="todo"></div>').text(text);

        // Add click event to remove the TO DO
        $todoDiv.click(function() {
            if (confirm('Do you want to remove this TO DO?')) {
                $(this).remove();
                saveTodos(); // Save list after removal
            }
        });

        // Insert new TO DO at the top of the list
        $('#ft_list').prepend($todoDiv);
        saveTodos(); // Save list after addition
    }

    // Function to save TO DOs to cookies
    function saveTodos() {
        const todos = [];
        $('.todo').each(function() {
            todos.push($(this).text());
        });
        document.cookie = `todos=${JSON.stringify(todos)};path=/;expires=Fri, 31 Dec 9999 23:59:59 GMT`;
    }

    // Function to load TO DOs from cookies
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

    // Event listener for 'New' button to create a new TO DO
    $('#newButton').click(function() {
        const todoText = prompt('Enter a new TO DO:');
        if (todoText && todoText.trim() !== '') {
            addTodo(todoText); // Add TO DO if it's not empty
        } else {
            alert('The TO DO cannot be empty.');
        }
    });

    // Load TO DOs when the page is loaded
    loadTodos();
});