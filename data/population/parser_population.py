# -*- coding: UTF-8 -*-
import csv

# Open input file
f = open('merged.csv', 'rb')

try:
    # Read input file
    reader = csv.reader(f)

    # Creates output file
    of = open('population-ine.csv', 'wb')
    wr = csv.writer(of, quoting=csv.QUOTE_ALL)

    for row in reader:                  # iterates the rows of the file in orders
        town = row[0].split(' ')        # split id & name
        if len(town) > 1:
            if len(town[0]) == 5:       # Avoid province lines with 2 digits code
                row.insert(0, town[0])  # insert id as first column
                town.pop(0)
                row[1] = ' '.join(town) # update single town name as second column
                wr.writerow(row)
        else:
            row.insert(0, 'id')         # Adds id label to header
            wr.writerow(row)
finally:
    f.close()      # closing
