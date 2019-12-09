// SF Ball Roll
// Builds off of Unity Roll-a-Ball tutorial

using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class ballRoll : MonoBehaviour
{

    public GameObject plane;
    public GameObject dropPoint;
    public AudioSource puckUpSound;

    private Rigidbody rb;
    private GameObject[] pickUps = GameObject.FindGameObjectsWithTag("PuckUp");
    private int count;

    private void Start()
    {
        rb = GetComponent<Rigidbody>();
        count = 0;
    }

    void Update()
    {
        // If ball falls 10 units below the plane, start game over
        // from the original drop point
        if (transform.position.y < plane.transform.position.y - 10)
        {
            transform.position = dropPoint.transform.position;

            // TODO: Debug the following phrase, which attempts to
            // add all pickup cubes back and reset the cube counter to 0
            // as part of the reset.
            foreach (GameObject pickUp in pickUps)
            {
                pickUp.SetActive(true);
            }
            // count = 0;
        }
    }

    // Keep track of cubes collected
    void OnTriggerEnter(Collider other)
    {
        if (other.gameObject.CompareTag("PickUp"))
        {
            puckUpSound.Play();
            other.gameObject.SetActive(false);
            count = count + 1;
        }
    }
}
