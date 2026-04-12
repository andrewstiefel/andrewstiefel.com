#!/bin/sh
# Persist runtime env vars so post-deployment scripts run via
# "docker exec" can access them (docker exec doesn't inherit them).
export -p > /etc/environment
exec "$@"
