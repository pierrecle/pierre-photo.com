#!/bin/sh
set -m
npm --no-color run watch &
npm --no-color run serve
fg %1