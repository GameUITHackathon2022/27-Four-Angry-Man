# Generated by Django 4.1.3 on 2022-11-26 18:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("auth_api", "0002_userprofile_type"),
    ]

    operations = [
        migrations.AlterField(
            model_name="userprofile",
            name="type",
            field=models.CharField(default="normal", max_length=100),
        ),
    ]
