<?php
/**
 * The main template file
 *
 * This is the most generic template file in a WordPress theme
 * and one of the two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query.
 * E.g., it puts together the home page when no home.php file exists.
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package react
 */

get_header(); ?>

    <div id="primary" class="outer-container">
        <main id="main" class="main-content" role="main">
            <section class="box box1"><div class="inner-container">BOX 1</div></section>
            <section class="box box2"><div class="inner-container">BOX 2</div></section>
            <section class="box box3"><div class="inner-container">BOX 3</div></section>
            <section class="box box4"><div class="inner-container">BOX 4</div></section>
            <section class="box box5"><div class="inner-container">BOX 5</div></section>

        </main><!-- #main -->
    </div><!-- #primary -->

<?php

get_footer();
