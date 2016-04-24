-Added apk file, platforms > android > build > outputs > apk
I tested the apk file using a HTC phone and everything worked fine,
however the android version it has is 4.x didn't have a device with 6.0
so I'm not 100% sure the build is correct for 6.0

The app isn't fully completed as I wanted it to be, would have liked
to implement more features in the options tab like changing themes using
css, re-organizing tasks and setting timed alerts but the main features are
there.

Main issue I had was with local storage, used a piece of code from the
ionic website but it's not perfect since switching browsers wipes the data.

Last note: I'm not quite sure if the apk file is what was required for this
project but the easiest way to run it would be connecting a usb to android
device and cding into the project directory and using 'ionic run android'.