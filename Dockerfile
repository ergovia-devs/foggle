#
# This file is part of foggle.
#
# foggle. is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# foggle is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with foggle.  If not, see <http://www.gnu.org/licenses/>.
#
# Dockerfile 25.06.18
#
# (c) Copyright 2018 ergovia GmbH
#

FROM node:9.2

ENV TZ "Europe/Berlin"

RUN mkdir -p /ergovia/apps/foggle/

ADD . /ergovia/apps/foggle/

WORKDIR /ergovia/apps/foggle/

EXPOSE 8070

ENTRYPOINT ./entrypoint.sh
