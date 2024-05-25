//Thêm sự kiện DOMContentLoaded để khởi chạy hàm init
document.addEventListener('DOMContentLoaded', init);

// Gắn sự kiện click cho nút "Add" để thêm công việc mới
document.getElementById('add-button').addEventListener('click', addTodo);

// Hàm thêm công việc mới
function addTodo() {
    //Lấy phần tử trong id todo-input
    const todoInput = document.getElementById('todo-input');
    //Lấy giá trị trong phần tử todo-input bỏ qua khoảng trắng đầu và cuối
    const todoText = todoInput.value.trim();
    //Lấy phần tử thông báo lỗi với id là error-message
    const errorMessage = document.getElementById('error-message');
    // Kiểm tra xem nội dung trong phần tử todo-input có rỗng hay không
    if (todoText === '') {
        errorMessage.textContent = 'Vui lòng nhập một nhiệm vụ'; // Hiển thị thông báo lỗi
        return;
    } else {
        errorMessage.textContent = ''; // Xóa thông báo lỗi nếu nội dung đã được nhập vào
    }
    // Lấy danh sách công việc từ Local Storage
    const todoList = getTodo();
    // Thêm công việc mới vào danh sách công việc
    todoList.push(todoText);
    // Lưu lại danh sách công việc vào Local Storage
    setTodo(todoList);
    // Xóa nội dung trong phần tử todo-input
    todoInput.value = '';
    // Hiển thị danh sách công việc
    renderTodo();
}

// Hàm lấy danh sách công việc từ Local Storage
function getTodo() {
    const todo = localStorage.getItem('todo');
    return todo ? JSON.parse(todo) : []; // Trả về mảng công việc hoặc mảng rỗng nếu không có dữ liệu
}

// Hàm lưu danh sách công việc vào Local Storage
function setTodo(todo) {
    localStorage.setItem('todo', JSON.stringify(todo)); // Chuyển đổi mảng thành chuỗi JSON và lưu vào Local Storage
}

// Hàm hiển thị danh sách công việc
function renderTodo() {
    const todoList = document.getElementById('todo-list');
    todoList.innerHTML = ''; // Xóa nội dung cũ của danh sách

    // Lấy danh sách công việc từ Local Storage
    const todo = getTodo();

    // Lặp qua từng công việc và hiển thị lên trang
    todo.forEach((todoItem, index) => {
        const li = document.createElement('li'); // Tạo phần tử <li> mới
        li.textContent = todoItem; // Đặt nội dung của <li> là công việc
        li.className = 'flex justify-between items-center mb-2'; // Định dạng CSS cho <li>

        // Tạo nút xóa và gắn sự kiện click để xóa công việc
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'bg-red-500 text-white px-2 py-1 rounded'; // Định dạng CSS cho nút xóa
        deleteButton.addEventListener('click', () => deleteTodo(index)); // Gắn sự kiện click

        li.appendChild(deleteButton); // Thêm nút xóa vào <li>
        todoList.appendChild(li); // Thêm <li> vào danh sách công việc
    });
}

// Hàm xóa công việc
function deleteTodo(index) {
    const todo = getTodo(); // Lấy danh sách công việc từ Local Storage
    todo.splice(index, 1); // Xóa công việc tại vị trí index
    setTodo(todo); // Lưu danh sách công việc mới vào Local Storage
    renderTodo(); // Hiển thị lại danh sách công việc sau khi xóa
}

// Hàm khởi chạy khi trang được tải
function init() {
    renderTodo(); // Hiển thị danh sách công việc khi trang được tải
}