from django.core.exceptions import ValidationError
import re

class ComplexPasswordValidator:
    def validate(self, password, user=None):
        if not re.search(r'[A-Z]', password):
            raise ValidationError(
                "비밀번호는 최소 1개 이상의 대문자를 포함해야 합니다.",
                code='password_no_upper',
            )
        if not re.search(r'[a-z]', password):
            raise ValidationError(
                "비밀번호는 최소 1개 이상의 소문자를 포함해야 합니다.",
                code='password_no_lower',
            )
        if not re.search(r'[!@#$%^&*(),.?":{}|<>]', password):
            raise ValidationError(
                "비밀번호는 최소 1개 이상의 특수문자를 포함해야 합니다.",
                code='password_no_symbol',
            )

    def get_help_text(self):
        return "비밀번호는 영문 대문자, 소문자, 특수문자를 각각 1개 이상 포함해야 합니다." 