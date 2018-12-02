/* Creativity and Computation - Unity HW 00
 * 
 * Spin a unity object (like a cube), and change the object's
 * material color after every full rotation.
 * 
 * Uses tutorials and documentation:
 * https://unity3d.com/learn/tutorials/topics/scripting/spinning-cube
 * https://docs.unity3d.com/ScriptReference/Transform.Rotate.html
 * https://docs.unity3d.com/ScriptReference/Material.SetColor.html
 * 
 * Anna Garbier, 2018-11-12
 */

using System.Collections;
using System.Collections.Generic;
using UnityEngine;


public class Spin : MonoBehaviour {

    Renderer rend;

    // Set the initial speed of the spinning cube to
    // 10 degrees per second. Store speed in a variable so
    // that we can change it in the inspector.
    [Range(0, 500)]
    public float speed = 50f;

    // Store temporary values between 0 - 360 in order
    // to keep track of cube's rotation.
    private float degreeCounter;

    private void Start() {
        rend = GetComponent<Renderer>();
    }

    private void Update() {
        // Rotate at a designated speed. Use Time.deltaTime for
        // smoothness.
        transform.Rotate(Vector3.up, speed * Time.deltaTime);

        // After every full rotation, change the object's
        // material color.
        degreeCounter += speed * Time.deltaTime;
        if (degreeCounter > 360)
        {
            degreeCounter = 0;
            ChangeColor();
        }
    }

    private void ChangeColor() {
        // Set the object's material to a random color.
        rend.material.SetColor("_Color", Random.ColorHSV());
    }

}
