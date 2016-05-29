#Errors:
  On Windows, when you start the gulp service, sometimes the admin looses all
  the privigleds that it has upon the server folder. That means that it is not
  possible to access it, modify it or delete it.
    Solution: Reset computer... It seams that when the gulp task "clean" is called,
    the "server" folder is deleted but the reference is still there. 
