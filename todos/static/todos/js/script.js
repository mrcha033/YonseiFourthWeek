document.addEventListener('DOMContentLoaded', () => {
    const todoForm = document.getElementById('todoForm');
    const todoInput = document.getElementById('todoInput');
    const dueDateInput = document.getElementById('dueDateInput');
    const todoList = document.getElementById('todoList');
    const calendarDiv = document.getElementById('calendar');
    const prevMonthBtn = document.getElementById('prevMonth');
    const nextMonthBtn = document.getElementById('nextMonth');
    const currentMonthSpan = document.getElementById('currentMonth');

    let todos = [];

    // 현재 날짜/시간을 기본값으로 설정
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    dueDateInput.value = `${year}-${month}-${day}T${hours}:${minutes}`;

    // 현재 표시중인 년월을 저장
    let currentDisplayDate = new Date();

    // 월 이동 버튼 이벤트 리스너
    prevMonthBtn.addEventListener('click', () => {
        currentDisplayDate.setMonth(currentDisplayDate.getMonth() - 1);
        updateCalendar();
    });

    nextMonthBtn.addEventListener('click', () => {
        currentDisplayDate.setMonth(currentDisplayDate.getMonth() + 1);
        updateCalendar();
    });

    // 할 일 추가 기능
    todoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const todoText = todoInput.value.trim();
        const dueDate = new Date(dueDateInput.value);
        
        if (todoText === '') return;

        const todo = {
            id: Date.now(),
            text: todoText,
            dueDate: dueDate,
            createdAt: new Date(),
            completed: false
        };

        todos.push(todo);
        renderTodoList();
        updateCalendar();
        
        todoInput.value = '';
    });

    // 할 일 목록 렌더링
    function renderTodoList() {
        todoList.innerHTML = '';
        
        todos.sort((a, b) => a.dueDate - b.dueDate).forEach(todo => {
            const li = document.createElement('li');
            li.className = 'todo-item';
            
            const content = document.createElement('div');
            content.className = 'todo-content';
            
            const text = document.createElement('div');
            text.textContent = todo.text;
            
            const dates = document.createElement('div');
            dates.className = 'todo-date';
            const isOverdue = new Date() > todo.dueDate && !todo.completed;
            dates.className = `todo-date ${isOverdue ? 'overdue' : ''}`;
            dates.textContent = `생성: ${formatDate(todo.createdAt)} / 마감: ${formatDate(todo.dueDate)}`;
            
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = '삭제';
            deleteBtn.className = 'delete-btn';
            
            deleteBtn.addEventListener('click', () => {
                todos = todos.filter(t => t.id !== todo.id);
                renderTodoList();
                updateCalendar();
            });

            content.appendChild(text);
            content.appendChild(dates);
            li.appendChild(content);
            li.appendChild(deleteBtn);
            todoList.appendChild(li);
        });
    }

    // 달력 렌더링
    function updateCalendar() {
        calendarDiv.innerHTML = '';
        
        const currentYear = currentDisplayDate.getFullYear();
        const currentMonth = currentDisplayDate.getMonth();
        const today = new Date();
        
        // 현재 표시중인 년월 텍스트 업데이트
        currentMonthSpan.textContent = `${currentYear}년 ${currentMonth + 1}월`;

        // 요일 헤더 추가
        const days = ['일', '월', '화', '수', '목', '금', '토'];
        days.forEach(day => {
            const dayDiv = document.createElement('div');
            dayDiv.className = 'calendar-day day-header';
            dayDiv.textContent = day;
            calendarDiv.appendChild(dayDiv);
        });

        // 달력 날짜 생성
        const firstDay = new Date(currentYear, currentMonth, 1);
        const lastDay = new Date(currentYear, currentMonth + 1, 0);
        
        // 첫 날의 요일만큼 빈 칸 추가
        for (let i = 0; i < firstDay.getDay(); i++) {
            const emptyDiv = document.createElement('div');
            calendarDiv.appendChild(emptyDiv);
        }

        // 날짜 추가
        for (let date = 1; date <= lastDay.getDate(); date++) {
            const dayDiv = document.createElement('div');
            dayDiv.className = 'calendar-day';
            
            // 오늘 날짜 표시
            const currentDate = new Date(currentYear, currentMonth, date);
            if (currentDate.toDateString() === today.toDateString()) {
                dayDiv.classList.add('today');
            }
            
            // 해당 날짜에 할 일이 있는지 확인
            const hasTodo = todos.some(todo => {
                const todoDate = new Date(todo.dueDate);
                return todoDate.getDate() === date && 
                       todoDate.getMonth() === currentMonth &&
                       todoDate.getFullYear() === currentYear;
            });
            
            if (hasTodo) {
                dayDiv.classList.add('has-todo');
            }
            
            dayDiv.textContent = date;
            calendarDiv.appendChild(dayDiv);
        }
    }

    // 날짜 포맷팅 함수
    function formatDate(date) {
        const options = { 
            year: 'numeric', 
            month: '2-digit', 
            day: '2-digit',
            hour: '2-digit', 
            minute: '2-digit'
        };
        return new Date(date).toLocaleString('ko-KR', options);
    }

    // 초기 렌더링
    updateCalendar();
});