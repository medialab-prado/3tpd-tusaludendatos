# -*- coding: UTF-8 -*-
import csv
import math

INDEX_HOSPITAL = 4      # Index of first column with hospital data
INDEX_POPULATION = 24   # Index of first column with population data

# Open input file
f = open('hospitals-and-population.csv', 'rb')

try:
    # Read input file
    reader = csv.reader(f,delimiter=';')
    reader.next()

    # Creates output file
    of = open('hospitals-per-habitant.csv', 'wb')
    wr = csv.writer(of, quoting=csv.QUOTE_ALL)

    for row in reader:                                         # iterates the rows of the file in orders
        for num in range(INDEX_HOSPITAL,INDEX_POPULATION):   # to iterate trough hospital data
            year = math.floor((num - INDEX_HOSPITAL)/4)
            if row[num] != '':
                row[num] = float(row[num]) / float(row[int(INDEX_POPULATION+year)])
        row[INDEX_POPULATION:len(row)] = []     # remove columns with population
        wr.writerow(row)
finally:
    f.close()      # closing