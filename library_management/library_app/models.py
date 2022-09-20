from django.db import models
from django.contrib.auth.models import AbstractBaseUser,BaseUserManager

# Create your models here.
class Usermanager(BaseUserManager):
    def create_user(self,username,email,password=None):
        if username is None:
            raise TypeError("Users should have a username")
        if email is None:
            raise TypeError("User should have an email")
        user=self.model(username=username,email=self.normalize_email(email))
        user.set_password(password)
        user.save()
        return user
    def create_superuser(self,username,email,password=None):
        if password is None:
            raise TypeError("Password should not be none")
        if email is None:
            raise TypeError("User should have an email")
        user=self.create_user(username,email,password)
        user.is_superuser=True
        user.is_staff=True
        user.save()
        return user
class Users(AbstractBaseUser):
    username= models.CharField(max_length=255, unique= False)
    email= models.EmailField(max_length=255, unique= True)
    token = models.CharField(max_length=500,default=0)
    is_staff=models.BooleanField(default=False)
    is_superuser=models.BooleanField(default=False)
    is_student=models.BooleanField(default=False)
    is_admin=models.BooleanField(default=False)
    

    USERNAME_FIELD='email'
    REQUIRED_FIELDS=['username']

    objects = Usermanager()
    def __str__(self):
        return self.username

    class Meta():
        db_table="Users"
        verbose_name_plural = "Users"


    def has_perm(self, perm, obj=None):
        return self.is_superuser

    def has_module_perms(self, app_label):
        return self.is_superuser


class Books(models.Model):
    book_name = models.CharField(max_length=50,unique=True)
    book_content = models.CharField(max_length=500)
    book_author_email = models.EmailField(max_length=255,default="email")
    book_price = models.IntegerField(default=0)
    token = models.CharField(max_length=500,default=0)

    class Meta():
        db_table="Books"
        verbose_name_plural = "Books"

    def __str__(self):
        return self.book_name