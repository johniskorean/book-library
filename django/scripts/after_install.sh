#!/usr/bin/env bash

echo "Pull Finished"
sudo systemctl daemon-reload
sudo systemctl restart nginx
