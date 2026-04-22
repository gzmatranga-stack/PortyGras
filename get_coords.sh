#!/bin/bash

addresses=(
    "1039 Broadway St, New Orleans, LA"
    "509 S Carrollton Ave, New Orleans, LA"
    "4905 Freret St, New Orleans, LA"
    "6100 Magazine St, New Orleans, LA"
    "1135 Decatur St, New Orleans, LA"
    "4920 Freret St, New Orleans, LA"
    "4336 Magazine St, New Orleans, LA"
    "501 Bourbon St, New Orleans, LA"
    "5535 Magazine St, New Orleans, LA"
    "216 Bourbon St, New Orleans, LA"
    "409 Decatur St, New Orleans, LA"
    "3067 St. Claude Ave, New Orleans, LA"
    "738 Toulouse St, New Orleans, LA"
)

for addr in "${addresses[@]}"; do
    echo "Address: $addr"
    result=$(curl -s "https://nominatim.openstreetmap.org/search?q=${addr// /+}&format=json&limit=1")
    if [ -n "$result" ] && [ "$result" != "[]" ]; then
        lat=$(echo $result | grep -o '"lat":"[^"]*"' | cut -d'"' -f4)
        lon=$(echo $result | grep -o '"lon":"[^"]*"' | cut -d'"' -f4)
        echo "  Lat: $lat, Lon: $lon"
    else
        echo "  Not found"
    fi
    echo ""
    sleep 1
done
