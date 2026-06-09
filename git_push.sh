#!/bin/bash
cd /home/mkr/quirky-labs-projects/eu-ai/phronesis-website
git init
git add .
git config --local user.email "madan@quirkylabs.ai"
git config --local user.name "Madan"
git commit -m "Initial commit of Phronesis website"
git branch -M main
git remote add origin https://github.com/madan-quirkylabs/phronesis-homepage.git
git push -u origin main
