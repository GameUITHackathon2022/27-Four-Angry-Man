# Generated by Django 4.1.3 on 2022-11-26 17:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("problem", "0003_problem_userof"),
    ]

    operations = [
        migrations.AddField(
            model_name="problem",
            name="status",
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
    ]