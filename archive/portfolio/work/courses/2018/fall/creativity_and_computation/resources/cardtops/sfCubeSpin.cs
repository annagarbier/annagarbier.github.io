// SF Ball Roll
// Builds off of Unity Roll-a-Ball tutorial

using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class cubeSpin : MonoBehaviour {
	
	// Update is called once per frame
	void Update () {
        // Cube pickup objects rotate
        transform.Rotate(new Vector3(0, 0, 90) * Time.deltaTime);
	}
}
