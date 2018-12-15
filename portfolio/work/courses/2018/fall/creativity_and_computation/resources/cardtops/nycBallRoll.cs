// NYC ballRoll script
// Builds from tutorial https://www.youtube.com/watch?v=uXNjNcqW4kY

using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class ballRoll : MonoBehaviour {

    public GameObject plane;
    public GameObject dropPoint;
	
	// Update is called once per frame
	void Update () {

        // If ball falls 10 units below the plane, start game over
        // from the original drop point
        if (transform.position.y < plane.transform.position.y - 10) {
            transform.position = dropPoint.transform.position;

        }
    }
}
