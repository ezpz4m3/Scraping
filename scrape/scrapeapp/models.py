from django.db import models

# Create your models here.
class Plans(models.Model):
    plan_name= models.CharField(max_length=10)
    plan_benefits=models.CharField(max_length=5000)

    def __str__(self):
        return self.plan_name

    class Meta():
        db_table="Plans"
        verbose_name_plural = "Plans"