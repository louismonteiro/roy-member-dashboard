<?php
error_reporting(E_ERROR);
ini_set('display_errors', 1);
$servername = 'localhost';
$username = 'admin_beta1';
$password = 'vALA6T7Slc';
$dbname = 'admin_beta1';
// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}


$affiliate=$_GET['ref'];
if (isset($affiliate))
{
    $incrementclicks_sql="INSERT INTO visitsbeta (affiliate_id,ipaddress,reg_date) VALUE ('".$affiliate."', '" . $_SERVER['HTTP_X_FORWARDED_FOR'] . "', '" . time() . "')";
    if (mysqli_query($conn, $incrementclicks_sql)) {
        echo 1;
        echo '<br>';

    } else {
        echo "Error: " . $incrementclicks_sql . "<br>" . mysqli_error($conn);
    }

}

$res = uniqid();
$team=addslashes(trim('30'));
$name = addslashes(trim('Aly Saafan'));
$email = addslashes(trim('alysaafan@icloud.com'));
$password = addslashes(trim('testtesttest'));
$birthday = addslashes(trim('1/05/1992'));
$country = addslashes(trim('Egypt'));
$phoneCode = addslashes(trim('01121111096'));
$verify_code = addslashes(trim('9999'));
$fbId = addslashes(trim('736422239849555'));
$forexExperience = addslashes(trim('never'));
$promocode = addslashes(trim('asasas'));
$pack = addslashes(trim('14'));
if ($pack==13)
{
    $profit=25;
}
elseif ($pack==14)
{
    $profit=40;
}
elseif ($pack==15)
{
    $profit=60;
}

if (
    trim($name) != '' &&
    trim($email) != '' &&
    trim($password) != '' &&
    trim($birthday) != '' &&
    trim($country) != '' &&
    trim($phoneCode) != '' &&
    trim($fbId) != '' &&
    trim($forexExperience) != '' &&
    trim($pack) != ''
)
{

    $newClient_sql = " INSERT INTO subscribers (active,address,address2,client, facebookId, name, email, password, mobile, country, birthday, forexExperience, added, verify_code, package, coupon, ip,referral_id,affiliate_id) VALUE ('1','streetaly','streetaly2','" . $team . "', '" . $fbId . "', '" . $name . "', '" . $email . "', '" . md5($password) . "', '" . $phoneCode . "', '" . $country . "', '" . $birthday . "', '" . $forexExperience . "', '" . time() . "', '" . $verify_code . "', '" . $pack . "', '" . $promocode . "', '" . $_SERVER['HTTP_X_FORWARDED_FOR'] . "', '" . $res . "', '" . $affiliate . "')";
    $countactive_sql = " SELECT * FROM subscribers WHERE active='1' AND affiliate_id='5c0236fec6a00' ORDER BY from_unixtime(`added`) ASC ";
    $countactive_sql_run = mysqli_query($conn, $countactive_sql);




    if ($conn->query($newClient_sql) === TRUE && $countactive_sql_run) {
        $last_id = $conn->insert_id;
        $newmembername_sql =" SELECT name FROM subscribers WHERE id='".$last_id."'";

        if ($countactive_sql_run->num_rows>=3 && isset($affiliate))
        {
            $addcommission = " INSERT INTO aff_commissionbeta (aff_id,member_id,package, profit,date) VALUE ('" . $affiliate . "', '" . $last_id . "', '" . $pack . "', '" . $profit . "', '" . time() . "')";
            if (mysqli_query($conn, $addcommission)) {

            } else {
                echo "Error: " . $addcommission . "<br>" . mysqli_error($conn);
            }
        }


        echo "New record created successfully. Total active members is: " . $countactive_sql_run->num_rows;
    } else {
        echo "Error" . $newClient_sql ;
    }



}


mysqli_close($conn);