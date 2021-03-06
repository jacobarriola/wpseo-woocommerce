<?php

namespace Yoast\WP\Woocommerce\Tests;

use PHPUnit\Framework\TestCase as PHPUnit_TestCase;
use Brain\Monkey;
use Mockery;

/**
 * TestCase base class.
 */
abstract class TestCase extends PHPUnit_TestCase {

	/**
	 * Test setup.
	 */
	protected function setUp() {

		parent::setUp();
		Monkey\setUp();

		Monkey\Functions\stubs(
			[
				// Using `null` makes that function return it's first argument.
				'esc_attr'       => null,
				'esc_html'       => null,
				'esc_textarea'   => null,
				'__'             => null,
				'_x'             => null,
				'esc_html__'     => null,
				'esc_html_x'     => null,
				'esc_attr_x'     => null,
				'is_admin'       => false,
				'is_multisite'   => false,
				'site_url'       => 'https://www.example.org',
				'wp_json_encode' => static function( $data, $options = 0, $depth = 512 ) {
					// phpcs:ignore Yoast.Yoast.AlternativeFunctions -- Mocks the wp_json_encode function.
					return \json_encode( $data, $options, $depth );
				},
				'wp_slash'       => null,
				'absint'         => static function( $value ) {
					return \abs( \intval( $value ) );
				},
			]
		);

		Monkey\Functions\expect( 'get_option' )
			->zeroOrMoreTimes()
			->with( Mockery::anyOf( 'wpseo', 'wpseo_titles', 'wpseo_taxonomy_meta', 'wpseo_social', 'wpseo_ms' ) )
			->andReturn( [] );

		Monkey\Functions\expect( 'get_site_option' )
			->zeroOrMoreTimes()
			->with( Mockery::anyOf( 'wpseo', 'wpseo_titles', 'wpseo_taxonomy_meta', 'wpseo_social', 'wpseo_ms' ) )
			->andReturn( [] );
	}

	/**
	 * Test tear down.
	 */
	protected function tearDown() {
		Monkey\tearDown();
		parent::tearDown();
	}
}
