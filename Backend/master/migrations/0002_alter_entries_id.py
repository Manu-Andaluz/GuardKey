# Generated by Django 5.0.3 on 2024-04-06 22:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('master', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='entries',
            name='id',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
    ]
