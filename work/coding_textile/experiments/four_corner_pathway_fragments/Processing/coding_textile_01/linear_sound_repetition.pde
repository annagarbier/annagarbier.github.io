// Take an audio file, and repeat it "horizontally"
// across the time access, without any manipulation to the
// sound itself.
//
// TODO: in the future, think about reflection of sound
// about various axes.
//
// Anna Garbier, 2018

// Import sound library
import ddf.minim.*;

// Create local sound object from sound library
Minim minim;
AudioPlayer player;

void setup () {
  size(200, 200);
  // Load sound file
  minim = new Minim(this);
  player = minim.loadFile("sound.wav");
}

void draw() {
  if (player.isPlaying()) {
        background(255);
        println("Sound is playing");
      } else {
        background(255);
        println("Sound is off");
        player.rewind();
        delay(1000);
        player.play();
      }
}
