package main

import (
	"encoding/json"
	"log"
	"os"
	"regexp"
	"strings"
)

func GetEnvOrFail(key string) string {
	value := os.Getenv(key)
	if value == "" {
		log.Fatalf("Environment variable %s is required", key)
	}
	return value
}

// Convert a snake case string to camel case
func toCamelCase(s string) []byte {
	re := regexp.MustCompile("_[a-z]")
	camelCase := re.ReplaceAllStringFunc(s, func(match string) string {
		return strings.ToUpper(string(match[1]))
	})
	return []byte(camelCase)
}

// Convert JSON with snake_case keys to camelCase
func jsonSnakeToCamel(jsonData []byte) ([]byte, error) {
	var data map[string]interface{}

	if err := json.Unmarshal(jsonData, &data); err != nil {
		return nil, err
	}

	camelCaseData := make(map[string]interface{})

	for key, value := range data {
		camelCaseKey := toCamelCase(key)
		camelCaseData[string(camelCaseKey)] = value
	}

	resultJSON, err := json.Marshal(camelCaseData)
	if err != nil {
		return nil, err
	}

	return resultJSON, nil
}
