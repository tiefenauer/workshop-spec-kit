#!/bin/bash

# Lighthouse smoke test script
# Usage: ./scripts/lighthouse-smoke.sh [URL]
# Default: http://localhost:3000

URL="${1:-http://localhost:3000}"

echo "🚀 Running Lighthouse smoke tests on $URL"
echo ""

# Check if lighthouse is installed
if ! command -v lighthouse &> /dev/null
then
    echo "Installing lighthouse..."
    npm install -g lighthouse
fi

# Pages to test
PAGES=(
    "$URL"
    "$URL/episodes"
    "$URL/about"
    "$URL/faq"
)

PASS=true

for page in "${PAGES[@]}"
do
    echo "📊 Testing $page..."

    if lighthouse "$page" --chrome-flags="--headless" --output=json --output-path=/tmp/lighthouse-report.json 2>/dev/null
    then
        # Parse the JSON output to get scores
        REPORT=$(cat /tmp/lighthouse-report.json)

        # Extract key metrics (simplified check - just verify the report was generated)
        if [ -f /tmp/lighthouse-report.json ] && [ -s /tmp/lighthouse-report.json ]
        then
            echo "   ✅ Report generated successfully"
        else
            echo "   ⚠️  Empty report"
            PASS=false
        fi
    else
        echo "   ❌ Failed to generate report"
        PASS=false
    fi
    echo ""
done

# Cleanup
rm -f /tmp/lighthouse-report.json

if [ "$PASS" = true ]
then
    echo "✅ All smoke tests passed!"
    exit 0
else
    echo "❌ Some smoke tests failed"
    exit 1
fi

