/* Controls the player for Unity's "Roll-A-Ball" tutorial.
 *
 * Also adds some custom elements for:
 * - counting down time from 30s
 * - displaying countdown time
 * - modifying objects and scenes when countdown hits 0
 *   or when player collects all tokens.
 *
 * Anna Garbier, MFADT 2018
 */

using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.SceneManagement;

public class PlayerController : MonoBehaviour
{
    public float speed;
    public Text countText;
    public Text timerText;
    public Text endText;

    private Rigidbody rb;
    private int count;
    private float timeLeft;

    private void Start()
    {
        rb = GetComponent<Rigidbody>();
        count = 0;
        timeLeft = 30.0f;
        SetCountText();
        SetTimerText();
        endText.text = "";
    }

    private void FixedUpdate()
    {
        float moveHorizontal = Input.GetAxis("Horizontal");
        float moveVertical = Input.GetAxis("Vertical");

        Vector3 movement = new Vector3(moveHorizontal, 0.0f, moveVertical);

        rb.AddForce(movement * speed);
        SetTimerValue();
        SetTimerText();
    }

    void OnTriggerEnter(Collider other)
    {
        if (other.gameObject.CompareTag("Pick Up"))
        {
            other.gameObject.SetActive(false);
            count = count + 1;
            SetCountText();
        }
    }

    void SetCountText()
    {
        countText.text = "Count: " + count.ToString();
        if (count >= 12)
        {
            endText.text = "You Win!";
        }
    }

    void SetTimerText()
    {
        timerText.text = "Time left: " + timeLeft.ToString("#.00") + "s";
        if (count >= 12)
        {
            endText.text = "You Win!";
        }
        else if (timeLeft <= 0)
        {
            RestartScene();
        }
    }

    void SetTimerValue() {
        if (timeLeft > 0.0f && count < 12)
        {
            timeLeft -= Time.deltaTime;
        }
        else if (timeLeft >= 0 && count < 12)
        {
            timeLeft = 0.0f;
        }
    }

    void RestartScene()
    {
        SceneManager.LoadScene(0);
    }
}
