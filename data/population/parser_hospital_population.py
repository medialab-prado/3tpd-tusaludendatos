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

    # Creates public output file
    of_public = open('beds-publics-per-habitant.csv', 'wb')
    public = csv.writer(of_public, quoting=csv.QUOTE_ALL)
    public.writerow(['ID', 'PROVINCE', '2010', '2011', '2012', '2013', '2014'])

    of_private = open('beds-private-per-habitant.csv', 'wb')
    private = csv.writer(of_private, quoting=csv.QUOTE_ALL)
    private.writerow(['ID', 'PROVINCE', '2010', '2011', '2012', '2013', '2014'])

    for row in reader:                                         # iterates the rows of the file in orders
        for num in range(INDEX_HOSPITAL,INDEX_POPULATION):   # to iterate trough hospital data
            year = math.floor((num - INDEX_HOSPITAL)/4)
            if row[num] != '':
                row[num] = 1000 * float(row[num]) / float(row[int(INDEX_POPULATION+year)])
        #row[INDEX_POPULATION:len(row)] = []     # remove columns with population
        public.writerow([row[2],row[3],row[21],row[17],row[13],row[9],row[5]])
        private.writerow([row[2],row[3],row[23],row[19],row[15],row[11],row[7]])
finally:
    f.close()      # closing