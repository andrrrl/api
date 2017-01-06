# api
Api Andes

En esta rama de la API se implemento la primera parte de *Two Phase Commit* en el put de espacioFisico.
Queda pendiente implementar la parte de *Recuperación ante Fallos*
Se utilizó la colección *transactions* para almacenar los distintos estados, pero también se pensó en utlizar un log en su lugar
Hay que documentar cada vez que se usen referencias. En el ejemplo, *espacioFisico* está referenciado en *agenda*