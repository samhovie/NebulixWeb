<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the web site, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * Localized language
 * * ABSPATH
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'local' );

/** Database username */
define( 'DB_USER', 'root' );

/** Database password */
define( 'DB_PASSWORD', 'root' );

/** Database hostname */
define( 'DB_HOST', 'localhost' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',          ';lu>EG.P#)X;zabR%+xaqqtoIHKnMo52UTqU2?fy-$iKtULAvUNt^|iey:y=P_`~' );
define( 'SECURE_AUTH_KEY',   '^O<+:aM>z-%;+jF_{;<8=GVhD%.>rrk5;`msG=.0c~3Rq.*AGEHM[;Tr9K$m[V[!' );
define( 'LOGGED_IN_KEY',     ';PrW%Z!LFT6CdXx*!![/bBFMTLy_imX}W]%l~2(>7R|NM=S&5PvJ,uOGu6j>X`cT' );
define( 'NONCE_KEY',         'G%n(u{~Y5)ibsuu!nvXr={1y)=s2m%TRBNE:TQY?i.aRgZ@WK>Q;r41@F!xTybT^' );
define( 'AUTH_SALT',         ':?9_=Vz3Jcn307e$<.S+YR=9dgMphI[9hAUSv=~)YUeX0TGC4OdBh0B}Ko5qW=J^' );
define( 'SECURE_AUTH_SALT',  '>e,ll&~`faRCvh&_~w,Xr&BaEMq%JVld7(EZg]sgb;t8X+<n[eR@9%X^ihW/eHGg' );
define( 'LOGGED_IN_SALT',    '<:By3uF8i@S`.?G`nvBZ5lrRIL57O?B+J00QpRq1N@Qg`gdJ&m1~y5sW}X>)CV@p' );
define( 'NONCE_SALT',        'x05<2%d?|S?HyvnX:p2[SscNEYM#Yg:+e,Q8f%88avqy`AoGz|4>eag2Ar&64@TP' );
define( 'WP_CACHE_KEY_SALT', 'Bt<0u[/&<Ar:B w<?6,3Rt~I)PdYJq/,r/M8H{.Ld(YN%3hQ9}-W>Z{X,)jMd>j ' );


/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';


/* Add any custom values between this line and the "stop editing" line. */



/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */
if ( ! defined( 'WP_DEBUG' ) ) {
	define( 'WP_DEBUG', false );
}

define( 'WP_ENVIRONMENT_TYPE', 'local' );
/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
