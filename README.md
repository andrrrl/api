API Andes
==========

En esta rama de la API se implementó la primera parte de <b>Two Phase Commit</b> en el put de espacioFisico.

Queda pendiente implementar la parte de <b>Recuperación ante Fallos*</b>

Se utilizó la colección <b>transactions</b> para almacenar los distintos estados, pero también se pensó en utlizar un log en su lugar  

Deberíamos documentar cada vez que se usen referencias a partes de otra colección. En el ejemplo, <b>espacioFisico</b> está referenciado en <b>agenda</b>  