from django.db import models


class Note(models.Model):
    body = models.TextField(null=True, blank=True)
    # auto_now her update edildiğindeki zamanı damgalar
    updated = models.DateTimeField(auto_now=True)
    # auto_now_add ilk oluşturulduğunda ki zamanı
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.body[0:50]  # ilk 50 karakteri göster
