// 폼 유효성 검사 향상
document.addEventListener('DOMContentLoaded', function() {
    // 에러 메시지 스타일링
    const errorLists = document.querySelectorAll('.errorlist');
    errorLists.forEach(list => {
        list.style.color = '#dc3545';
        list.style.marginTop = '5px';
        list.style.fontSize = '0.9em';
    });

    // 입력 필드 스타일링
    const inputs = document.querySelectorAll('input[type="text"], input[type="password"]');
    inputs.forEach(input => {
        input.classList.add('form-control');
    });

    // 버튼 스타일링
    const buttons = document.querySelectorAll('button[type="submit"]');
    buttons.forEach(button => {
        if (button.closest('form').id === 'login-form') {
            button.classList.add('btn-login');
        } else {
            button.classList.add('btn-signup');
        }
    });
});
