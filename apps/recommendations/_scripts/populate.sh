#!/bin/bash

# This script is used to populate the database with some initial data

function check_command {
    if command -v $1 &> /dev/null
    then
        echo "$1 is installed"
    else
        echo "$1 is not installed. Please install $1 and try again"
        exit 1
    fi
}

# make a function that takes as input a table name and a topic name and sends the data to the topic
function send_data_to_topic {
    table_name=$1
    topic_name=$2
    database=$3

    echo "Sending data from $table_name to $topic_name"

    query="SELECT json_agg(row_to_json($table_name)) FROM $table_name;"
    echo "$query" > /tmp/query.sql

    export PGPASSWORD=postgres
    psql -h localhost -U postgres -d $database -f /tmp/query.sql -t -A > /tmp/$table_name.json

    exists=$(jq -r '.[0]' /tmp/$table_name.json)

    if [ "$exists" == "null" ]
    then
        echo "No $table_name found in the database. Please add some $table_name and try again"
        exit 1
    fi

    for row in $(cat /tmp/$table_name.json | jq -r '.[] | @base64')
    do
        # decode the row
        _row() {
            echo ${1} | base64 --decode | jq -r ${2}
        }

        nats pub $topic_name "$(_row $row '.')"
    done
}

check_command "psql"
check_command "nats"

send_data_to_topic "job_category" "recommendations.job-category.create" "jobs"
send_data_to_topic "job" "recommendations.job.create" "jobs"
send_data_to_topic "job_offer" "recommendations.job-offer.create" "joboffers"
send_data_to_topic "advantage" "recommendations.advantage.create" "joboffers"
