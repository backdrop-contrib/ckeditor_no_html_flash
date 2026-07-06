CKEditor No HTML FLash
=======================

This module fixes a UX issue in core's implementation of the CKEditor5 module. When the user saves
a form using CKEditor5, there is a "flash" of plain HTML right when the form is submitted.

This 25-second video demonstrates the behavior on a clean install:

https://github.com/user-attachments/assets/e828b83d-5524-4ba9-86e5-a9b518b40d9d

There is currently an issue in core which addresses the problem. This module is meant to be a
workaround until that PR is merged (if accepted).  
The core issue URL is: https://github.com/backdrop/backdrop-issues/issues/7149. If this PR
is ever merged and released, this module will be marked as deprecated.



How This Module Works
---------------------

This module is very simple. When a form (which is using a text_format element) is submitted, we set a 
javascript variable. 

Also, we override core's code for "detach" of CKEditor5 to first check for this javascript variable. If
the form is in the process of being submitted, we do **not** destroy the editor, thereby preventing
the flash of plain HTML.



Usage
-----

Once enabled, this module requires no special actions to take effect. If it detects an element in a form
which might be using CKEditor, it will automatically make use of the workaround code.


Installation
------------

- Install this module using the official Backdrop CMS instructions at
  https://backdropcms.org/guide/modules


Current Maintainers
-------------------

- [Richard Peacock](https://github.com/swampopus) (original creator for Backdrop CMS)


License
-------

This project is GPL v2 software. See the LICENSE.txt file in this directory for
complete text.