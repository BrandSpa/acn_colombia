<?php
use PHPUnit\Framework\TestCase;
use \Mockery as m;

require str_replace('tests/apis', '', __DIR__) .'/apis/mailchimp.php';

class MailchimpTest extends TestCase 
{
	public function testSubscribeContact() 
	{
		$faker = Faker\Factory::create();
		$data = '{
      "email_address": "'.$faker->email.'",
      "status": "subscribed",
      "merge_fields": {"COUNTRY": "'.$faker->country.'", "FNAME": "'. $faker->name .'"},
      "update_existing": true
  	}';

		$listId = "somelistid";
		$apiKey= "somerandomapikey-us13";
		$subscription = mc_subscribe($data, $listId, $apiKey);
		$response = json_decode($subscription);

		$this->assertObjectHasAttribute('id', $response);
		$this->assertObjectHasAttribute('email_address', $response);
	}
}


